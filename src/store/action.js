import router from '../router'
// 导出一个 post 事件，这里的用户参数是 { article, articleId }，article 包含文章标题和内容，
// articleId 是文章 ID
export const post = ({commit, state}, {article, articleId}) => {
    let articles = state.articles;
    // 没有文章时，建一个空数组
    if (!Array.isArray(articles)) articles = [];
    // 存在 article 时
    if (article) {
        const uid = 1;
        // 获取用户传过来的 title 和 content
        const {title, content} = article;
        //获取当前日期
        const date = new Date();
        // 如果没传 articleId，表示新建文章
        if (articleId === undefined) {
            // 获取最后一篇文章
            const lastArticle = articles[articles.length - 1];
            if (lastArticle) {
                // 将当前 articleId 在最后一篇文章的 articleId 基础上加 1
                articleId = parseInt(lastArticle.articleId) + 1
            } else {
                // 将当前 articleId 在文章长度基础上加 1
                articleId = articles.length + 1
            }
            // 将当前文章添加到所有文章
            articles.push({
                uid,
                articleId,
                title,
                content,
                date
            })
        }
        //更新所有文章
        commit('UPDATE_ARTICLES', articles);
        // 跳转到首页，并附带 articleId 和 showMsg 参数，
        // showMsg 用来指示目标页面显示一个提示，我们稍后添加相关逻辑
        router.push({name: 'Content', params: {articleId, showMsg: true}})
    }
};
