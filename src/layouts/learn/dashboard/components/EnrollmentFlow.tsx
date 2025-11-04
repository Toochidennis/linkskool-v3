
import { useState } from 'react';
import Button from '#/components/modules/learn/Button'
import {
  RiAddLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBankCardLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiGraduationCapLine,
  RiGroupLine,
  RiLoader4Line,
  RiMailLine,
  RiMastercardLine,
  RiPlayCircleLine,
  RiRocketLine,
  RiSecurePaymentLine,
  RiShieldCheckLine,
  RiUserAddLine,
  RiUserLine,
  RiVisaLine
} from 'react-icons/ri';

interface EnrollmentFlowProps {
  cohort: any;
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onCancel: () => void;
}

interface PaymentCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

const mockCards: PaymentCard[] = [
  {
    id: '1',
    last4: '4242',
    brand: 'visa',
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true
  },
  {
    id: '2',
    last4: '5555',
    brand: 'mastercard',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false
  }
];

export default function EnrollmentFlow({ cohort, currentStep, onStepChange, onComplete, onCancel }: EnrollmentFlowProps) {
  const [selectedCard, setSelectedCard] = useState(mockCards.find(card => card.isDefault)?.id || '');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    saveCard: true
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, title: 'Enrollment', icon: RiUserAddLine },
    { id: 2, title: 'Payment', icon: RiBankCardLine },
    { id: 3, title: 'Learning', icon: RiGraduationCapLine }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      onStepChange(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onComplete();
  };

  const handleAddCard = () => {
    // Simulate adding card
    console.log('Adding new card:', newCard);
    setShowAddCard(false);
    setNewCard({ number: '', expiry: '', cvc: '', name: '', saveCard: true });
  };

  const getBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa': return RiVisaLine;
      case 'mastercard': return RiMastercardLine;
      case 'amex': return RiBankCardLine;
      default: return RiBankCardLine;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiGraduationCapLine className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Enrollment</h3>
              <p className="text-gray-600">You're about to join an amazing learning experience</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <img
                  src={cohort.banner}
                  alt={cohort.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{cohort.title}</h4>
                  <p className="text-gray-600 mb-3">Instructor: {cohort.instructor}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Start Date:</span>
                      <div className="font-semibold">{new Date(cohort.startDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <div className="font-semibold">
                        {Math.ceil((new Date(cohort.endDate).getTime() - new Date(cohort.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">${cohort.price}</div>
                  <div className="text-sm text-gray-500">one-time payment</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h5 className="font-bold text-gray-900 mb-4">What's included:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Live interactive sessions',
                  'Recorded video lectures',
                  'Hands-on assignments',
                  'Peer collaboration',
                  'Instructor feedback',
                  'Certificate of completion',
                  'Lifetime access to materials',
                  '30-day money-back guarantee'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <RiCheckLine className="text-white text-xs" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiSecurePaymentLine className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">Choose your payment method to complete enrollment</p>
            </div>

            {/* Payment Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">{cohort.title}</h4>
                  <p className="text-gray-600">One-time payment</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">${cohort.price}</div>
                  <div className="text-sm text-green-600">✓ 30-day guarantee</div>
                </div>
              </div>
            </div>

            {/* Saved Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-gray-900">Payment Method</h5>
                <button
                  onClick={() => setShowAddCard(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center cursor-pointer"
                >
                  <RiAddLine className="mr-1" />
                  Add New Card
                </button>
              </div>

              {mockCards.map((card) => {
                const BrandIcon = getBrandIcon(card.brand);
                return (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCard(card.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCard === card.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                          <BrandIcon className="text-white text-2xl" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            •••• •••• •••• {card.last4}
                          </div>
                          <div className="text-sm text-gray-600">
                            Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                          </div>
                        </div>
                        {card.isDefault && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${selectedCard === card.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                        }`}>
                        {selectedCard === card.id && (
                          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                            <RiCheckLine className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Add New Card Form */}
              {showAddCard && (
                <div className="bg-white rounded-xl border-2 border-blue-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h6 className="font-bold text-gray-900 ">Add New Card</h6>
                    <button
                      onClick={() => setShowAddCard(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <RiCloseLine />
                      <span className="sr-only">Close</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={newCard.number}
                        onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                        <input
                          type="text"
                          value={newCard.cvc}
                          onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={newCard.name}
                        onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="saveCard"
                        checked={newCard.saveCard}
                        onChange={(e) => setNewCard({ ...newCard, saveCard: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="saveCard" className="text-sm text-gray-700">
                        Save this card for future purchases
                      </label>
                    </div>

                    <Button
                      onClick={handleAddCard}
                      variant="primary"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                      Add Card
                    </Button>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <RiShieldCheckLine className="text-white text-sm" />
                  </div>
                  <div>
                    <h6 className="font-semibold text-green-800 mb-1">Secure Payment</h6>
                    <p className="text-sm text-green-700">
                      Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiRocketLine className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Learn!</h3>
              <p className="text-gray-600">Your enrollment is complete. Let's start your learning journey</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RiCheckLine className="text-white text-2xl" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Enrollment Successful!</h4>
                <p className="text-gray-600 mb-4">
                  Welcome to <strong>{cohort.title}</strong>. You're now enrolled and ready to begin learning.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <RiCalendarLine className="text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Next Session</div>
                    <div className="text-xs text-gray-600">{new Date(cohort.startDate).toLocaleDateString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <RiUserLine className="text-purple-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Instructor</div>
                    <div className="text-xs text-gray-600">{cohort.instructor}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <RiGroupLine className="text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Classmates</div>
                    <div className="text-xs text-gray-600">{cohort.enrolledStudents + 1} students</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h5 className="font-bold text-gray-900 mb-4">What happens next?</h5>
              <div className="space-y-3">
                {[
                  { icon: RiMailLine, text: 'Check your email for course materials and access instructions' },
                  { icon: RiCalendarLine, text: 'Add course schedule to your calendar' },
                  { icon: RiGroupLine, text: 'Join the course community and meet your classmates' },
                  { icon: RiPlayCircleLine, text: 'Start with the pre-course materials and introduction videos' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="text-blue-600 text-sm" />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              >
                <RiCloseLine className="text-white text-xl" />
                <span className="sr-only">Close</span>
              </button>
              <h2 className="text-2xl font-bold text-white">Course Enrollment</h2>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= step.id
                    ? 'bg-white text-blue-600'
                    : 'bg-white/20 text-white/60'
                    }`}>
                    <step.icon className="text-lg" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 transition-all ${currentStep > step.id ? 'bg-white' : 'bg-white/20'
                      }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Title */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-white/90">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {currentStep === 2 && (
                <span className="flex items-center">
                  <RiShieldCheckLine className="mr-2 text-green-500" />
                  Secured by 256-bit SSL encryption
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {currentStep > 1 && (
                <Button
                  onClick={() => onStepChange(currentStep - 1)}
                  variant="ghost"
                  className="border border-gray-300 hover:bg-gray-50"
                >
                  <RiArrowLeftLine className="mr-2" />
                  Back
                </Button>
              )}

              <Button
                onClick={handleNext}
                variant="primary"
                disabled={isProcessing || (currentStep === 2 && !selectedCard)}
                className={`px-8 ${currentStep === 3
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  }`}
              >
                {isProcessing ? (
                  <>
                    <RiLoader4Line className="mr-2 animate-spin" />
                    Processing...
                  </>
                ) : currentStep === 2 ? (
                  <>
                    <RiSecurePaymentLine className="mr-2" />
                    Pay ${cohort.price}
                  </>
                ) : currentStep === 3 ? (
                  <>
                    <RiRocketLine className="mr-2" />
                    Start Learning
                  </>
                ) : (
                  <>
                    Continue
                    <RiArrowRightLine className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
