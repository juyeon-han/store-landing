import { useEffect, useState } from 'react';

interface ControllerInit {
  initTabId: string;
}

interface Controller {
  activeTabId: string;
  handleActiveTab: (id: string) => void;
}

export const useTabController = (props: ControllerInit): Controller => {
  const { initTabId } = props;
  const [activeTabId, setActiveTabId] = useState<string>('000');

  const handleActiveTab = (id: string) => {
    setActiveTabId(id);
  };

  useEffect(() => {
    setActiveTabId(initTabId);
  }, [initTabId]);

  return {
    activeTabId,
    handleActiveTab,
  };
};
