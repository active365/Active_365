const OrderHistory: React.FC = ()=>{
    const orders = [
        { id: 1, date: "2024-04-01"},
        { id: 2, date: "2024-03-25"},
      ];
    
    return (<>
    <div className="px-6 py-4">
            <ul className="divide-y divide-gray-300">
              {orders.map((order) => (
                <li key={order.id} className="py-3 text-gray-700">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <button className="btn">Detail</button>
                </li>
              ))}
            </ul>
          </div>
    </>
    )
}
export default OrderHistory