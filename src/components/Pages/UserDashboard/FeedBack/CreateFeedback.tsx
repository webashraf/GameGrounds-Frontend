/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import useUser from "../../../../hooks/userHook";
import { useAddFeedbackMutation } from "../../../../Redux/api/feedback.api";
import { Button } from "../../../ui/button";

type TFeedbackFormData = {
  feedback: string;
};

const CreateFeedback = () => {
  const [addFeedback] = useAddFeedbackMutation();

  const user = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFeedbackFormData>();

  const onSubmit: SubmitHandler<TFeedbackFormData> = async (data) => {
    try {
      const res = await addFeedback({ ...data, user: user?._id }).unwrap();

      if (res?.success) {
        toast.success(res?.message);
        reset();
      } else {
        toast.error(res?.error?.message || "Feedback failed to add!");
        reset();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Feedback failed to add!");
      reset();
    }
  };

  return (
    <div className="mx-auto lg:w-[50%] lg:px-0 px-5 lg:h-auto">
      <h2 className="lg:text-6xl text-4xl lg:mt-10 mt-32 text-black uppercase mb-10">
        Submit Feedback
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 bg-white p-5 w-full"
      >
        <div className="w-full p- rounded-lg">
          <label
            className="block text-gray-700 text-lg font-bold"
            htmlFor="feedback-input"
          >
            Feedback
          </label>
          <textarea
            placeholder="Your feedback"
            {...register("feedback", { required: "Feedback is required" })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            id="feedback-input"
            rows={5}
          />
          {errors.feedback && (
            <span className="text-red-500 error_message">
              {errors.feedback.message}
            </span>
          )}
        </div>

        <Button type="submit" className="uppercase text-lg mt-3 bg-black">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateFeedback;
