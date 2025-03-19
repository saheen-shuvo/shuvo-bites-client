/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import loadingAnimation from "../../../../public/Animation - 1742381715655.json";
import Lottie from "lottie-react";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <div
        className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 lg:w-72 border-dashed font-semibold border-gray-400 mx-auto 
      mb-8 mt-8"
      >
        PAYMENT HISTORY
      </div>
      {isLoading ? (
        <>
          <div className="flex justify-center items-center my-16">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              className="w-24 h-24"
            />
          </div>
        </>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Price</th>
                  <th>Transaction Id</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{payment.price}$</td>
                    <td className="text-green-800">{payment.transactionId}</td>
                    <td>{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
