import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Function to be called when the provided index is out of range
 */
export type OnIndexEndFn<Type = "start" | "end"> = (
  index: number,
  endType: Type
) => void;
type ChangeIndexFn<Type> = (onIndexEnd?: OnIndexEndFn<Type>) => void;
type GoToIndexFn<T = "start" | "end"> = (
  index: number,
  onIndexEnd: OnIndexEndFn<T>
) => void;

interface FormMultistepContext {
  steps: Record<string, number>;
  currentIndex: number;
  isLastIndex: boolean;
  addStep: (id: string) => void;
  removeStep: (id: string) => void;
  /** Increment the current index */
  nextIndex: ChangeIndexFn<"end">;
  /**
   * Decrement the current index
   *
   * @param onIndexEnd Function to call when `prevIndex` is called on the first
   *                   Index (0)
   */
  prevIndex: ChangeIndexFn<"start">;

  /**
   * Navigate to the provided index.
   *
   * The first or last index would be used when the provided index is
   * more than or less than the last or first index
   *
   * @param index Index to navigate to
   */
  goToIndex: GoToIndexFn;
}

interface FormMultistep {
  children: ReactNode;
  /**
   * Index of the default step to show
   */
  defaultIndex?: number;
  className?: string;
  onIndexChange?: (index: number) => void;
}

export const FormMultistepContext = createContext<FormMultistepContext>({
  steps: {},
  currentIndex: 0,
  isLastIndex: false,
  nextIndex() {},
  prevIndex() {},
  goToIndex() {},
  addStep() {},
  removeStep() {},
});

function FormMultistepProvider({
  children,
  defaultIndex = 0,
  onIndexChange,
}: FormMultistep) {
  const [steps, setStep] = useState<FormMultistepContext["steps"]>({});
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const isLastIndex = useMemo(
    () => currentIndex === Object.values(steps).length - 1,
    [currentIndex, steps]
  );

  function addStep(id: string) {
    setStep((steps) => {
      const stepCount = Object.values(steps).length;

      return {
        ...steps,
        [id]: stepCount === 0 ? 0 : stepCount,
      };
    });
  }

  function removeStep(id: string) {
    setStep((steps) => {
      const _steps = { ...steps };
      delete _steps[id];

      return _steps;
    });
  }

  const goToIndex: GoToIndexFn = (index, onIndexEnd) => {
    const [minIndex, maxIndex] = [0, Object.values(steps).length - 1];

    if (index > maxIndex) {
      onIndexEnd(index, "end");
      return;
    }

    if (index < minIndex) {
      onIndexEnd(index, "start");
      return;
    }

    setCurrentIndex(index);
  };

  const nextIndex: ChangeIndexFn<"end"> = (onIndexEnd) => {
    const index = currentIndex + 1;
    goToIndex(index, () => onIndexEnd?.(index, "end"));
  };
  const prevIndex: ChangeIndexFn<"start"> = (onIndexEnd) => {
    const index = currentIndex - 1;
    goToIndex(index, () => onIndexEnd?.(index, "start"));
  };

  useEffect(() => {
    return () => {
      setCurrentIndex(0);
    };
  }, []);

  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex]);

  return (
    <FormMultistepContext.Provider
      value={{
        steps,
        currentIndex,
        isLastIndex,
        addStep,
        removeStep,
        nextIndex,
        prevIndex,
        goToIndex,
      }}
    >
      {children}
    </FormMultistepContext.Provider>
  );
}

export default FormMultistepProvider;
