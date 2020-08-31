// variables 
const tweetList = document.getElementById('tweet-list');

//event listners
eventListeners();

function eventListeners(){
//form sbmission 
document.querySelector('#form').addEventListener('submit', newTweet);
//remove tweet from the list 
    tweetList.addEventListener('click',removeTweet);
//document 
document.addEventListener('DOMContentLoaded', localStorageLoad);
}

// functions
function newTweet(e){
    e.preventDefault();

    //read the text area value
    const tweet = document.getElementById('tweet').value;

    //create a remove button 
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    //create an li element 
    const li = document.createElement('li');
    li.textContent = tweet;

    //add the remove button to each tweet
    li.appendChild(removeBtn);

    //Add to the list 
    tweetList.appendChild(li);

    //add tweet to a local storage
    addTweetLocalStorage(tweet);

    //print the alert message
    alert('tweet Added');

    //rest 
    this.reset();
}

//removes the tweets from the DOM 
function removeTweet(e){
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove();
    }
    //remove tweet from storage 
    removeTweetLocalStorage(e.target.parentElement.textContent);
    //alert 
    alert('Tweet removed');
}

//add tweet local storage
function addTweetLocalStorage(tweet){
    let tweets = getTweetsFromStorage();


    //add the tweet into the array 
    tweets.push(tweet);

    //Convert tweet array  into string 
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage(){
    let tweets; 
    let tweetsLS=localStorage.getItem('tweets');
    //get the value if null is returned then we create empty array 
    if(tweetsLS===null)
    {
        tweets= [];
    }
    else{
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}
//prints local storage tweets on load 
function localStorageLoad(){
    let tweets = getTweetsFromStorage();
    //loop through storage and print the values 
    tweets.forEach(function(tweet){
        //create a remove button 
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //create an li element 
        const li = document.createElement('li');
        li.textContent = tweet;

        //add the remove button to each tweet
        li.appendChild(removeBtn);

        //Add to the list 
        tweetList.appendChild(li);
    });
}

//remove tweet from local storage 
function removeTweetLocalStorage(tweet) { 
    //get tweets from storage
    let tweets = getTweetsFromStorage();

    //remove the x from the tweet 
    const tweetDelete = tweet.substring(0,tweet.length-1);

    //loop through the tweets and remove the tweet that is equal 
    tweets.forEach(function(tweetLS, index){
        if(tweetDelete===tweetLS){
            tweets.splice(index,1);
        }
    });

    //save the data
    localStorage.setItem('tweets',JSON.stringify(tweets));
    
}