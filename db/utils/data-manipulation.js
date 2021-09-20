// extract any functions you are using to manipulate your data, into this file

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
        return [article.title, article.topic, article.author, article.body, article.create_at, article.votes]; 
    })
    return formattedArticlesData;
}

exports.formatCommentsData = (commentData) => {
    const formattedCommentsData = commentData.map((comment) => {
        return [comment.body, comment.votes, comment.author, comment.article_id, comment.create_at];
        
    })
    return formattedCommentsData;
}

// exports.createSlugRef = (topicsRows) => {
//     console.log(topicsRows)
//     const slugRef = {};
//     topicsRows.forEach((topic) => {
//         slugRef[topic.slug] = topic.topic
//     })
//     return slugRef
//}