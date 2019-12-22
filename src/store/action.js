import router from '../router'
// 导出一个 post 事件，这里的用户参数是 { article, articleId }，article 包含文章标题和内容，
// articleId 是文章 ID
export const post = ({ commit, state }, { article, articleId }) => {
    let articles = state.articles

    if (!Array.isArray(articles)) articles = []

    if (article) {
        const uid = 1
        const { title, content } = article
        const date = new Date()

        if (articleId === undefined) {
            const lastArticle = articles[articles.length - 1]

            if (lastArticle) {
                articleId = parseInt(lastArticle.articleId) + 1
            } else {
                articleId = articles.length + 1
            }

            articles.push({
                uid,
                articleId,
                title,
                content,
                date
            })
        } else {
            for (let article of articles) {
                if (parseInt(article.articleId) === parseInt(articleId)) {
                    article.title = title
                    article.content = content
                    break
                }
            }
        }

        commit('UPDATE_ARTICLES', articles)
        router.push({ name: 'Content', params: { articleId, showMsg: true } })
    } else {
        for (let article of articles) {
            if (parseInt(article.articleId) === parseInt(articleId)) {
                articles.splice(articles.indexOf(article), 1)
                break
            }
        }

        commit('UPDATE_ARTICLES', articles)
        router.push({ name: 'Home', params: { showMsg: true } })
    }
}
