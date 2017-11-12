// @flow

const initialState: ConfigurationState = {
  currentStep: 0,
  detectionType: '',
  imageUrl: '',
  uploadType: '',
};

export default function reducer(
  state: ConfigurationState = initialState,
  action: Action,
): ConfigurationState {
  switch (action.type) {
    default:
      return state;
  }
}
