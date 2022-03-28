import _ from 'lodash';
import {useState} from 'react';

type UseSetMethods<T> = {
  add: (value: T) => void;
  remove: (value: T) => void;
  toggle: (value: T) => void;
  clear: () => void;
  isEmpty: () => boolean;
};

type UseSetReturn<T> = [Array<T>, UseSetMethods<T>];

type UseSetParams<T> = Partial<{
  /**take the latest added value and remove all the current values */
  takeTheLatest: boolean;

  /** see `uniqBy` option also */
  defaultValue: Array<T>;

  /**
   * used to distinguish elements of `defaultValue`
   * if it isn't an array of primitives
   */
  uniqBy: (value: T) => any;
}>;

export function useSet<T>({
  defaultValue = [],
  takeTheLatest = false,
  uniqBy = v => v,
}: UseSetParams<T> = {}): UseSetReturn<T> {
  const [set, setSet] = useState<Array<T>>(defaultValue);

  const add = (value: T) => {
    setSet(v => {
      const newSet = takeTheLatest ? [value] : [...v, value];
      return _.uniqBy(newSet, uniqBy);
    });
  };

  const remove = (value: T) => {
    setSet(innerSet => innerSet.filter(v => uniqBy(v) !== uniqBy(value)));
  };

  const clear = () => {
    setSet(() => []);
  };

  const toggle = (value: T) => {
    const existed = set.some(v => uniqBy(v) === uniqBy(value));
    if (existed) {
      remove(value);
    } else {
      add(value);
    }
  };

  const isEmpty = () => {
    return set.length === 0;
  };

  const setActions = {
    add,
    toggle,
    remove,
    clear,
    isEmpty,
  };

  return [set, setActions];
}
