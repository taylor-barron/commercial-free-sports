export default function HowItWorksContent({ user }) {

    return (

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                    <div className="p-6 bg-red-50 dark:bg-red-800/20 text-white text-2xl font-bold">
                        How It Works
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        This web application is designed to rate football games that are live or have already been played in order to 
                        help the user determine which games will be most entertaining to watch.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The idea for this comes from the difficulty in enjoying a late summer to early winter Saturday in the best way possible. 
                        My entire life I have wanted to watch the best college footbal games that are played AND I want to do other things. Whether 
                        those other things are family, friends, work, the yard, golf, intramurals, boating, hiking, or whatever else you like that 
                        I don't, all college football fans have something that they would rather be doing/get done instead of watching commercials 
                        all day. This app allows you to record every college football game and let the app tell you which games to watch without 
                        telling you anything about it. This app takes the risk out of recording and gives back hours of your Saturdays from watching 
                        ads.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Game ratings are calculated in several parts. The first and maybe most important is generated by calculating how much of 
                        the game was close OR by whether the team that was losing was able to make a comeback. This is modified with a bonus if 
                        the game was closer than the spread.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The second part is the importance of the game. This is generated very simply, currently. If the team has played less than 
                        ten games then this score factors in historical record. The historical record accounts for the percentage of games less than 
                        ten. (EX: For a team that has played five games historical record factors in 50%.) If the team has played ten games then the 
                        importance for each team is the win/loss percentage. These are added together and divided by two.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The third rating is the explosiveness rating. Great games have big plays and this rating is created by 
                        iterating through each play of the game and adding to an explosiveness score when chunk plays, scores, 
                        turnovers, sacks and other big plays happen.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The fourth rating is the talent composite score of the two teams. All things being equal, great athletes 
                        make great games. The more talent on the field, the better. This rating is pulled from College Football API 
                        and not modified very much.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        The final and least important rating is for how many penalties occur in the game. This should be weighted the least heavily 
                        but all things being equal games are much better when they are not a ref show.
                    </div>

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        These ratings are weighted and added together to form a total composite ranking which is displayed in ranked order within the 
                        web application.
                    </div>
                </div>
            </div>
        </div>
    );
}