import { useState, useEffect } from 'react';

const usePageVisibility = (onTabSwitchLimitReached, tabSwitchLimit = 2) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setHiddenCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount >= tabSwitchLimit) {
            onTabSwitchLimitReached();
          }
          return newCount;
        });
      }
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tabSwitchLimit, onTabSwitchLimitReached]);

  return isVisible;
};

export default usePageVisibility;
