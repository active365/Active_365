import DetailCard from "@/components/detailCard/DetailCard";
import { arrayProducts } from "@/helpers/arrayProducts";

const Detail = async ({ params }: { params: { id: string } }) => {
    // Asegúrate de esperar params antes de usarlo
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams?.id;

    if (!id) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">
                    Invalid Product ID
                </h1>
            </div>
        );
    }

    const product = arrayProducts.find((product) => product.id.toString() === id);

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">
                    Product not found
                </h1>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex w-full max-w-7xl space-x-8">
                <div className="flex-1">
                    <DetailCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imgUrl={product.imgUrl}
                        price={product.price}
                        stock={product.stock}
                        description={product.description}
                        category_id={product.category_id}
                    />
                </div>

                <div className="w-1/4 pl-4">
                    <div className="p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-3">Transform your body with our training plans!</h2>
                        <p className="text-base mb-4">Join our personalized training plans to reach your goals. Whether you are looking to increase strength, flexibility, or overall wellness, we have the perfect plan for you.</p>
                        <button className="px-3 py-1 bg-white text-yellow-600 font-semibold rounded-md">
                            Explore the plans!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
