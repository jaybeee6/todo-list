import { StoreHelper } from "../storeHelper";
import { Modals } from "../../components/modals";

export interface FeedbackState {
  visibleModals: Partial<Record<Modals, number>>;
}

export const initialFeedbackState: FeedbackState = {
  visibleModals: {},
};

interface UseFeedbackStoreOutput extends FeedbackState {
  showModal: (modalName: Modals) => void;
  hideModal: (modalName: Modals) => void;
}

export const useFeedbackStore = StoreHelper.createStore<UseFeedbackStoreOutput>(
  (set) => ({
    ...initialFeedbackState,
    showModal: function (modalName: Modals) {
      set(
        (state: FeedbackState) =>
          handleFeedbackStateVisibilityChange(
            state,
            "visibleModals",
            modalName,
            true
          ),
        false,
        "showModal"
      );
    },
    hideModal: function (modalName: Modals) {
      set(
        (state: FeedbackState) =>
          handleFeedbackStateVisibilityChange(
            state,
            "visibleModals",
            modalName,
            false
          ),
        false,
        "hideModal"
      );
    },
  }),
  "##TODO/STORE/FEEDBACK/"
);

export const handleFeedbackStateVisibilityChange = (
  currentState: FeedbackState,
  key: keyof FeedbackState,
  name: Modals,
  show: boolean
): Partial<FeedbackState> => {
  const currentValue =
    ((currentState[key] as Record<string, number>)[name] as
      | number
      | undefined) || 0;

  let newValue = currentValue - (show ? -1 : 1);
  newValue = newValue < 0 ? 0 : newValue;

  return {
    ...currentState,
    [key]: {
      ...currentState[key],
      [name]: newValue,
    },
  };
};
