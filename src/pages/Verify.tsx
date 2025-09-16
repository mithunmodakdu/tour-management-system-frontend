import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOTPMutation, useVerifyOTPMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export default function Verify() {
  const location = useLocation();
  // console.log(location.state)
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const [sendOTP] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const [timer, setTimer] = useState(120);

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email]);

  useEffect(()=>{
    const timerId = setInterval(() =>{
      if(email && confirmed){
        setTimer((prev) => prev -1)
      }
    }, 1000)

  }, [email, confirmed])

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleConfirm = async() =>{
    // const toastId = toast.loading("Sending OTP")

     setConfirmed(true);

    // try {
    //   const res = await sendOTP({email: email}).unwrap();
      
    //   if(res.success){
    //     toast.success("OTP has been sent to your email", {id: toastId});
       
    //   }
  
    // } catch (error) {
    //   console.log(error)
    // }

  }

  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP")
    const userInfo = {
      email,
      otp: data.pin
    }

    try {
      const res = await verifyOTP(userInfo).unwrap();
      if(res.success){
        toast.success("OTP verified.", {id: toastId})
      }
    } catch (error) {
      console.log(error)
    }
    console.log(data);
  }

  return (
    <div className="h-screen grid place-content-center">
      {confirmed ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Verify your Email Address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to your email address <br />{" "}
              {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button variant="link">Resend OTP</Button>
                        {timer}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Send OTP to Email Address</CardTitle>
            <CardDescription>
              We will send OTP to your email address <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button onClick={handleConfirm} className="w-[300px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
