
export default function Week({ week }) {

    return (
        <div key={week.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-4">

            <a href={ week.link } className="p-6 text-white text-2xl font-bold flex justify-between items-center">

                <div>
                    { week.week }
                </div>

            </a>

        </div>
    );
    
}