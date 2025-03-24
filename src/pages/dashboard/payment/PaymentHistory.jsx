/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import loadingAnimation from "../../../../public/Animation - 1742381715655.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

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
    <div className="pt-4 md:pt-8">
      <div className="mb-8 text-center sm:text-xl lg:text-3xl border-y-2 w-72 border-dashed font-semibold border-gray-400 mx-auto">
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
          {payments.length > 0 ? (
            <>
              {/* TABLE FOR LARGE SCREEN */}
              <div className="overflow-x-auto hidden md:block">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Transaction Id</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          {new Date(payment.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>{payment.price}$</td>
                        <td className="text-green-600">
                          {payment.transactionId}
                        </td>
                        <td>{payment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TABLE FOR SMALL SCREEN */}
              <div className="overflow-x-auto block md:hidden">
                {payments.map((payment, index) => (
                  <table className="table table-zebra mb-4 border-2 border-gray-200 shadow-sm">
                    <tbody>
                      <tr>
                        <th>Serial</th>
                        <td>{index + 1}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>
                          {" "}
                          {new Date(payment.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </td>
                      </tr>
                      <tr>
                        <th>Price</th>
                        <td>{payment.price}</td>
                      </tr>
                      <tr>
                        <th>Transaction Id</th>
                        <td className="text-green-600">
                          {payment.transactionId}
                        </td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>{payment.status}</td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl font-semibold my-24">
                No Payment History Found! Wanna Order Something?
              </p>
              <Link to="/orderfood">
                <button className="styled-btn">ORDER NOW</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
