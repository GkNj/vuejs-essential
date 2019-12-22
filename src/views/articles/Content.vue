<template>
    <div class="blog-container" style="margin-top:20px">
        <div class="blog-pages">
            <div class="col-md-9 left-col pull-right">
                <div class="panel article-body content-body">
                    <h1 class="text-center">{{ title }}</h1>
                    <div class="article-meta text-center">
                        <i class="fa fa-clock-o"></i>
                        <abbr>{{date |moment('from')}}</abbr>
                    </div>
                    <div class="entry-content">
                        <div class="content-body entry-content panel-body ">
                            <div class="markdown-body" v-html="content"></div>
                            <!--   添加编辑删除图标 -->
                            <div v-if="auth & uid===1" class="panel-footer operate">
                                <div class="actions">
                                    <a @click="deleteArticle" class="admin" href="javascript:;">
                                        <i class="fa fa-trash-o"></i>
                                    </a>
                                    <a @click="editArticle" href="javascript:;" class="admin">
                                        <i class="fa fa-pencil-square-o"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde'
    import hljs from 'highlight.js'
    import emoji from 'node-emoji'
    import {mapState} from "vuex";

    export default {
        name: 'Content',
        date() {
            return {
                title: '',//文章标题
                content: '',//文章内容
                date: '',//创建时间
                uid: 1
            }
        },
        // 添加计算属性
        computed: {
            // 将仓库的以下状态混入到计算属性之中
            ...mapState([
                    'auth',
                    'user'
                ]
            )
        },
        created() {
            const articleId = this.$route.params.articleId;
            const article = this.$store.getters.getArticleById(articleId);
            if (article) {
                console.log(article);
                let {uid, title, content, date} = article;
                this.uid = uid;
                this.title = title;
                this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name, name => name));
                this.date = date;
                this.$nextTick(() => {
                    this.$el.querySelectorAll('pre code').forEach((el) => {
                        hljs.highlightBlock(el)
                    })
                })
            }
            this.articleId = articleId;
        },
        methods: {
            editArticle() {
                this.$route.push({name: 'Edit', params: {articleId: this.articleId}})

            },
            deleteArticle() {
                this.$swal({
                    text: '你确定要删除此内容吗?',
                    confirmButtonText: '删除'
                }).then((res) => {
                    if (res.value) {
                        this.$store.dispatch('post', {articleId: this.articleId})
                    }
                })
            }
        }

    }

</script>
