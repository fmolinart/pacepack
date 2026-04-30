import { createContext, useContext } from 'react';

type OnboardingContextType = {
  completeOnboarding: () => void;
};

export const OnboardingContext = createContext<OnboardingContextType>({
  completeOnboarding: () => {},
});

export const useCompleteOnboarding = () => useContext(OnboardingContext).completeOnboarding;
