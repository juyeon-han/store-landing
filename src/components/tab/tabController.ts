import { useState } from 'react';

interface ControllerInit {
  initTabId: string;
}

interface Controller {
  activeTabId: string;
  handleActiveTab: (id: string) => void;
}

export const useTabController = (props: ControllerInit): Controller => {
  const { initTabId } = props;
  const [activeTabId, setActiveTabId] = useState<string>(initTabId);

  const handleActiveTab = (id: string) => {
    setActiveTabId(id);
  };

  return {
    activeTabId,
    handleActiveTab,
  };
};
