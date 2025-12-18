import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key';
};

type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert'];
type ContactMessageUpdate = Database['public']['Tables']['contact_messages']['Update'];

export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب جميع الرسائل
  const fetchMessages = async () => {
    try {
      setLoading(true);
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using mock data');
        setMessages([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.warn('Error fetching messages:', err);
      setMessages([]);
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب الرسائل');
    } finally {
      setLoading(false);
    }
  };

  // إضافة رسالة جديدة
  const addMessage = async (messageData: ContactMessageInsert) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot add message');
        return;
      }

      const { data, error } = await supabase
        .from('contact_messages')
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;
      setMessages(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.warn('Error adding message:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في إرسال الرسالة');
      throw err;
    }
  };

  // تحديث حالة الرسالة
  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot update message');
        return;
      }

      const { data, error } = await supabase
        .from('contact_messages')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setMessages(prev => prev.map(msg => msg.id === id ? data : msg));
      return data;
    } catch (err) {
      console.warn('Error updating message:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحديث الرسالة');
      throw err;
    }
  };

  // حذف رسالة
  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في حذف الرسالة');
      throw err;
    }
  };

  // إحصائيات الرسائل
  const getMessagesStats = () => {
    const total = messages.length;
    const unread = messages.filter(msg => msg.status === 'unread').length;
    const read = messages.filter(msg => msg.status === 'read').length;
    const replied = messages.filter(msg => msg.status === 'replied').length;

    return { total, unread, read, replied };
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    fetchMessages,
    addMessage,
    updateMessageStatus,
    deleteMessage,
    getMessagesStats
  };
};