import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Leaf, TrendingUp, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import { Button } from '../components/ui/button';

const slides = [
  {
    icon: Activity,
    title: "Smart Crop Monitoring",
    description: "Monitor your farm's health in real-time with AI-powered IoT sensors tracking soil, temperature, humidity, and nutrients.",
    image: "sensor-monitoring"
  },
  {
    icon: Leaf,
    title: "Disease Diagnosis from Images",
    description: "Instantly identify crop diseases by scanning leaves with your phone camera. Get AI-powered diagnoses with confidence scores.",
    image: "disease-detection"
  },
  {
    icon: TrendingUp,
    title: "Crop & Yield Recommendations",
    description: "Get personalized crop recommendations based on your soil type, climate, and field conditions. Predict yields accurately.",
    image: "yield-prediction"
  },
  {
    icon: MessageSquare,
    title: "AI Agronomist in Arabic & English",
    description: "Chat with your personal AI farming expert anytime. Get advice, action plans, and solutions in your preferred language.",
    image: "ai-consultant"
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background">
        {/* Skip button */}
        <div className="flex justify-end p-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="text-muted-foreground"
          >
            Skip
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-[24px] pt-[70px] pb-[80px]">
          <div className="w-full max-w-sm space-y-8">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="bg-primary/10 p-8 rounded-3xl">
                <Icon className="w-20 h-20 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {slide.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-6 pb-8 space-y-6">
          {/* Dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {currentSlide > 0 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`${currentSlide === 0 ? 'w-full' : 'flex-1'}`}
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
              {currentSlide < slides.length - 1 && (
                <ChevronRight className="w-4 h-4 ml-1" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
