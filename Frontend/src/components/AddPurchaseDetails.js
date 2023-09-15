import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAlert } from "react-alert";

export default function AddPurchaseDetails({
  addSaleModalSetting,
  products,
  handlePageUpdate,
  authContext
}) {
  const [purchase, setPurchase] = useState({
    userID: authContext.user,
    productID: "",
    quantityPurchased: "",
    purchaseDate: "",
    totalPurchaseAmount: "",
  });

  const alert=useAlert()
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  console.log("PPu: ", purchase);

  // Handling Input Change for input fields
  const handleInputChange = (key, value) => {
    setPurchase({ ...purchase, [key]: value });
  };

  // POST Data
  const addSale = () => {
    fetch("http://localhost:4000/api/purchase/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(purchase),
    })
      .then((result) => {
        alert.success("Purchase added");
        handlePageUpdate();
        addSaleModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      initialFocus={cancelButtonRef}
      onClose={setOpen}
    >
      <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="bg-white rounded-lg shadow-xl transform transition-all sm:w-full sm:max-w-md">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Purchase Details
                </h3>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={addSaleModalSetting}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>

              <form className="mt-4 space-y-4">
                <div>
                  <label htmlFor="productID" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <select
                    id="productID"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    name="productID"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  >
                    <option value="">Select Products</option>
                    {products.map((element, index) => (
                      <option key={element._id} value={element._id}>
                        {element.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="quantityPurchased" className="block text-sm font-medium text-gray-700">
                    Quantity Purchased
                  </label>
                  <input
                    type="number"
                    name="quantityPurchased"
                    id="quantityPurchased"
                    value={purchase.quantityPurchased}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0 - 999"
                  />
                </div>
                <div>
                  <label htmlFor="totalPurchaseAmount" className="block text-sm font-medium text-gray-700">
                    Total Purchase Amount
                  </label>
                  <input
                    type="number"
                    name="totalPurchaseAmount"
                    id="price"
                    value={purchase.totalPurchaseAmount}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="$299"
                  />
                </div>
                <div>
                  <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={purchase.purchaseDate}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-300"
                    onClick={addSale}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  );
}
