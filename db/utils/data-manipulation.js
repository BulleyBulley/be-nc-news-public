// extract any functions you are using to manipulate your data, into this file

// function dateFilter (dateInput) {

// }
    

exports.formatTopicsData = (topicData) => {
    const formattedTopicsData = topicData.map((topic) => {
    return [topic.slug, topic.description];    
    });
    return formattedTopicsData;
}

exports.formatUsersData = (userData) => {
    const formattedUsersData = userData.map((user) => {
    return [user.username, user.avatar_url, user.name];    
    });
    return formattedUsersData;
}

exports.formatArticlesData = (articleData) => {
    
    const formattedArticlesData = articleData.map((article) => {
        return [article.title, article.topic, article.author, article.body, article.created_at.toLocaleString('en-UK', {hour12: false}), article.votes]; 
    })
    return formattedArticlesData;
}

exports.formatCommentsData = (commentData) => {
    const formattedCommentsData = commentData.map((comment) => {
        return [comment.body, comment.votes, comment.author, comment.article_id, comment.create_at];
        
    })
    return formattedCommentsData;
}

exports.dateConverter = (dateInput) => {
            //let dateOutput = ""
            let date = new Date(dateInput),
                month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [day, month, year].join('-');
         
    
    }




// function dateConverter (dateInput) {
//         let date = new Date(dateInput),
//             month = '' + (date.getMonth() + 1),
//             day = '' + date.getDate(),
//             year = date.getFullYear();
//         if (month.length < 2) 
//             month = '0' + month;
//         if (day.length < 2) 
//             day = '0' + day;
//         return [day, month, year].join('-');
// }


// exports.createSlugRef = (topicsRows) => {
//     console.log(topicsRows)
//     const slugRef = {};
//     topicsRows.forEach((topic) => {
//         slugRef[topic.slug] = topic.topic
//     })
//     return slugRef
//}