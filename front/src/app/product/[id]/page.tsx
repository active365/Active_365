import { arrayProducts } from "@/helpers/arrayProducts";
import DetailCard from "@/components/detailCard/DetailCard";

const Detail = async ({ params }: { params: { id: string } }) => {
    const currentDate = new Date();
    const deadline = new Date("2025-01-01");

    const productId = await params?.id;

    if (!productId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">Invalid product ID.</h1>

            </div>
        );
    }

    const product = arrayProducts.find((product) => product.id.toString() === productId);


    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            {currentDate < deadline && (
                <div
                    className="relative w-full h-[300px] sm:h-[400px] text-white text-center bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/bannerSanta.png')",
                    }}
                >
                   
                </div>
            )}

            <div className="flex flex-col lg:flex-row w-full max-w-7xl px-4 py-10 space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
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

                <div className="lg:w-1/4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3">Transform your body with our training plans!</h2>
                    <p className="text-base mb-4">
                        Join our personalized training plans to reach your goals. Whether you are looking to increase
                        strength, flexibility, or overall wellness, we have the perfect plan for you.
                    </p>
                    <button className="w-full px-4 py-2 bg-white text-yellow-600 font-semibold rounded-md hover:bg-gray-100">
                        Explore the plans!
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Detail;
