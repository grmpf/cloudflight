import useStateWithCallback from './useStateWithCallback';

export default function useStateAsToggle(initialValue = false) {
  return useStateWithCallback(initialValue);
}
