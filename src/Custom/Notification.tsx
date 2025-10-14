import React, { useEffect } from 'react';
import { notification } from 'antd';

interface NotificationCustomProps {
  open: boolean;
  title: string;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  onCancel?: () => void;
}

const NotificationCustom: React.FC<NotificationCustomProps> = ({
  open,
  title,
  icon,
  description,
  duration = 2,
  onCancel,
}) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (open) {
      const key = `Notification-${Date.now()}`;
      api.info({
        key,
        icon,
        message: title,
        description,
        duration,
        placement: 'topRight',
        onClose: onCancel,
      });
    }
  }, [open, title, icon, description, duration, api, onCancel]);

  return <>{contextHolder}</>;
};

export default NotificationCustom;
