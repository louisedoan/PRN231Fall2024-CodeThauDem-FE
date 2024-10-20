import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  selectOrders,
  selectSelectedOrder,
  setSelectedOrder,
  clearSelectedOrder,
  selectLoading,
} from "../lib/redux/reducers/historySlice";
import { selectUserId } from "../lib/redux/reducers/userSlice";
import OrderList from "../components/ui/modal/OrderList";
import OrderDetail from "../components/ui/modal/OrderDetail";

export default function History() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const orders = useSelector(selectOrders);
  const selectedOrder = useSelector(selectSelectedOrder);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  }, [dispatch, userId]);

  const handleViewDetails = (orderId) => {
    const order = orders.find((o) => o.orderId === orderId);
    dispatch(setSelectedOrder(order));
  };

  const handleBack = () => {
    dispatch(clearSelectedOrder());
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>Không có đơn hàng nào để hiển thị.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Lịch sử Mua Vé Máy Bay</h1>
      {selectedOrder ? (
        <OrderDetail order={selectedOrder} onBack={handleBack} />
      ) : (
        <OrderList orders={orders} onViewDetails={handleViewDetails} />
      )}
    </div>
  );
}
