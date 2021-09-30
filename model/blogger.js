const {google} = require('googleapis');
const axios = require('axios');
const firestore = require('../database/firestore');
const config = require('../config');

const blogger = google.blogger({
    version: 'v3',
    auth: config.APIkey
});

async function getBlogid(email) {
    const result = await firestore.getApi(email);
    return result[0].data.idBlogger;
}

async function listPost(email) {
    const blogId = await getBlogid(email);
    const result = await blogger.posts.list({blogId: blogId});
    if (result.status === 200) {
        const listPost = await axios.get(result.request.responseURL);
        let json = [];
        for (let i = 0; i < listPost.data.items.length; i++) {
            const data = {
                id: listPost.data.items[i].id,
                url: listPost.data.items[i].url,
                published: listPost.data.items[i].published,
                title: listPost.data.items[i].title,
                labels: listPost.data.items[i].labels
            }
            json.push(data);
        }
        return json;
    }
}

async function getPost(email,postId) {
    const blogId = await getBlogid(email);
    const result = await blogger.posts.get({blogId: blogId, postId: postId})
    let data;
    if (result.status === 200) {
        const listPost = await axios.get(result.request.responseURL);
        return data = {
            postId: listPost.data.id,
            url: listPost.data.url,
            title: listPost.data.title,
            published: listPost.data.published,
            content: listPost.data.content,
            labels: listPost.data.labels
        }
    }
}

async function updatePost(email, postId, title, content, labels) {
    const result = await firestore.getUser(email);

    const data = {
        "title": title,
        "content": content,
        "labels": labels
    };
    const url = `https://www.googleapis.com/blogger/v3/blogs/${result[0].data.idBlogger}/posts/${postId}`;
    const options = {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${result[0].data.accessToken}`, 'Content-Type': 'application/json'},
        data: data,
        url,
    };

    await axios(options);
}

async function newPost(email, title, content, labels) {
    const accsetToken = await firestore.getUser(email);

    const data = {
        "title": title,
        "content": content,
        "labels": labels
    };
    const url = `https://www.googleapis.com/blogger/v3/blogs/${accsetToken[0].data.idBlogger}/posts/`;
    const options = {
        method: 'POST',
        headers: {'Authorization': `Bearer ${accsetToken[0].data.accessToken}`, 'Content-Type': 'application/json'},
        data: data,
        url,
    };
    const result = await axios(options);
    return result;
}

async function deleteBlog(email, postsId) {
    const accsetToken = await firestore.getUser(email);
    const url = `https://www.googleapis.com/blogger/v3/blogs/${accsetToken[0].data.idBlogger}/posts/${postsId}`;
    const options = {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${accsetToken[0].data.accessToken}`},
        url,
    };
    const result = await axios(options);
    if (result.status === 204) {
        return "DELETE";
    } else {
        return "Not";
    }

}


module.exports = {
    getPost, listPost, updatePost, newPost, deleteBlog
}