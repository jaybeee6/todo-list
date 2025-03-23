import { useCallback } from "react";
import { useFeedbackStore } from "../../store";
import { Modals } from "../../components/modals";

export interface ModalHook {
  hide: () => void;
  show: () => void;
  isVisibleModal: boolean;
}

export const useModal = (modalName: Modals): ModalHook => {
  const hideModal = useFeedbackStore((state) => state.hideModal);
  const showModal = useFeedbackStore((state) => state.showModal);
  const visibleModals = useFeedbackStore((state) => state.visibleModals);

  const show = useCallback(() => {
    showModal(modalName);
  }, [modalName, showModal]);

  const hide = useCallback(() => {
    hideModal(modalName);
  }, [modalName, hideModal]);

  const isVisibleModal = (visibleModals?.[modalName] || 0) > 0;

  return {
    hide,
    show,
    isVisibleModal,
  };
};
