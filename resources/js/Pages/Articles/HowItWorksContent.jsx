export default function HowItWorksContent({ user }) {

    return (

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                    <div className="p-6 bg-red-50 dark:bg-red-800/20 text-white text-2xl font-bold">
                        How It Started
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Hi, I'm Taylor 👋. I have always loved two things: college football and weekends. A good chunk of my life has been about  
                        maximizing both. No Commercials Pro was built to show you the most enjoyable games to watch so that you can maximize your 
                        football viewing experience and your weekend. This site is a tool to help you watch the best games as if you were switching 
                        to the best as they were on originally.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Skip Commercials Pro uses an alogrithm that is able to rate the awesomeness of a football game and rank them per TV 
                        time slot WITHOUT spoiling anything about the game. What does that mean? It means that you can do whatever you love to do 
                        through Saturday afternoon and then you are free to watch the four best games of the day back to back without sitting through a 
                        single commercial break.  
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Oh, you're sick of the Burger King commercial? The Allstate commercial is especially annoying this year? I haven't seen it. And 
                        I won't ever have to.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        By the way, if you can't/don't want to live the commercial free lifestyle for whatever reason and just want to see the games 
                        of the week ranked algorithmetically check out Best Ofs for rankings by week/year for each ranking category.
                    </div>

                    <div className="p-6 bg-red-50 dark:bg-red-800/20 text-white text-2xl font-bold">
                        How It Works
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Game ratings are calculated in several parts. The first and maybe most important is generated by calculating how much of 
                        the game was close OR by whether the team that was losing was able to make a comeback. This is modified with a bonus if 
                        the game was closer than the betting spread.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The second part is the importance of the game. This is generated very simply. If the team has played less than 
                        ten games then this score factors in historical record. The historical record accounts for the percentage of games less than 
                        ten. (EX: For a team that has played five games historical record factors in 50%.) If the team has played ten games then the 
                        importance for each team is the win/loss percentage. These are added together and divided by two (There's two teams).
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The third rating is the explosiveness rating. Great games have big plays and this rating is created by 
                        iterating through each play of the game and adding to an explosiveness score when chunk plays, scores, 
                        turnovers, sacks and other big plays happen.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The fourth rating is the talent composite score of the two teams. All things being equal, great athletes usually 
                        make great games. The more talent on the field, the better. This rating is pulled from College Football API that tracks overall 
                        team talent and not modified very much.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The final and least important rating is for how many penalties occur in the game. This should be weighted the least heavily 
                        but if I have to choose between no penalties and lots of penalties that choice is pretty easy.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        These ratings are weighted and added together to form a total composite ranking which is the order that games are ranked by. 
                        If you make a profile you can weight the scores differently.
                    </div>
                </div>
            </div>
        </div>
    );
}