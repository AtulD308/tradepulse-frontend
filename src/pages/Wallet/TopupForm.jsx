import { paymentHandler } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopupForm = () => {
  const [amount, setAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      })
    );
    console.log(amount, paymentMethod);
  };

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-lg"
          placeholder="$9999"
        />
      </div>
      <div>
        <h1 className="pb-1">Select payment method</h1>
        <RadioGroup
          onValueChange={(value) => {
            setPaymentMethod(value);
          }}
          className="flex"
          defaultValue="RAZORPAY"
        >
          {/* Razorpay Option */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
              <RadioGroupItem
                icon={DotFilledIcon}
                iconClassName="h-8 w-8"
                className="h-9 w-9"
                value="RAZORPAY"
                id="r1"
              />
              <Label htmlFor="r1">
                <div className="bg-white rounded-md px-5 py-2 w-32 flex items-center justify-center">
                  <img
                    src="https://razorpay.com/assets/razorpay-glyph.svg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                    alt="Razorpay"
                    className="h-8 object-contain"
                  />
                  <span
                    style={{ display: "none" }}
                    className="text-blue-600 font-bold text-sm"
                  >
                    Razorpay
                  </span>
                </div>
              </Label>
            </div>
            <span className="text-sm text-gray-400 tracking-wide">Razorpay</span>
          </div>

          {/* Stripe Option */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center space-x-2 rounded-md border p-3 px-5">
              <RadioGroupItem
                icon={DotFilledIcon}
                className="h-9 w-9"
                iconClassName="h-8 w-8"
                value="STRIPE"
                id="r2"
              />
              <Label htmlFor="r2">
                <div className="bg-white rounded-md px-5 py-2 w-32 flex items-center justify-center">
                  <img
                    className="h-10 object-contain"
                    src="https://js.stripe.com/v3/fingerprinted/img/stripe-logo-blurple-small-b14c3cb.svg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                    alt="Stripe"
                  />
                  <span
                    style={{ display: "none" }}
                    className="text-indigo-600 font-bold text-sm"
                  >
                    Stripe
                  </span>
                </div>
              </Label>
            </div>
            <span className="text-sm text-gray-400 tracking-wide">Stripe</span>
          </div>
        </RadioGroup>
      </div>

      {wallet.loading ? (
        <Skeleton className="py-7 w-full" />
      ) : (
        <Button
          onClick={handleSubmit}
          variant=""
          className="w-full py-7 text-xl"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default TopupForm;