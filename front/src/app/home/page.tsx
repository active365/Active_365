import Card from "@/components/productCard/Card";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-5xl font-semibold text-center text-white mb-8">

            </h1>
            <div>
                <Card />
            </div>
        </div>
    );
}

export default Home;