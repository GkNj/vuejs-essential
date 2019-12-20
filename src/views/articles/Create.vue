<template>
    <div class="blog-container">
        <div class="blog-pages">
            <div class="col-md-12 panel">
                <div class="panel-body">
                    <h2 class="text-center">创作文章</h2>
                    <hr>
                    <div data-validator-form>
                        <div class="form-group">
                            <input v-model.trim="title" v-validator:blur.required="{title:'标题'}"
                                   type="text" class="form-control" placeholder="请填写标题" @input="saveTitle">
                        </div>
                        <div class="form-group">
                            <!-- 这个 <textarea id="editor"> 元素将作为 SimpleMDE 编辑器的绑定元素使用-->
                            <textarea id="editor"></textarea>
                        </div>
                        <br>
                        <div class="form-group">
                            <span @click="post">
                            <button class="btn btn-primary" type="submit">发 布</button>
                            </span>
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
    import ls from '@/utils/localStorage'

    window.hljs = hljs

    export default {
        name: 'Create',
        data() {
            return {
                title: '', // 文章标题
                content: '' // 文章内容
            }
        },
        mounted() {
            const simplemde = new SimpleMDE({
                element: document.querySelector('#editor'),
                placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
                spellChecker: false,
                autoDownloadFontAwesome: false,
                autosave: {
                    enabled: true,
                    uniqueId: 'vuejs-essential'
                },
                renderingConfig: {
                    codeSyntaxHighlighting: true
                }
            })
            // 监听编辑器的 change 事件
            simplemde.codemirror.on('change', () => {
            //将改变后的值赋给文章内容
                this.content = simplemde.value()
            });
            //将simplemde添加到当前实例，以便在其他地方调用
            this.c = simplemde;
            //初始化标题和内容
            this.fillContent()
        },
        methods: {
            //编辑器会自动保存文章内容，文章标题需要自己保存
            saveTitle() {
                ls.setItem('smde_title', this.title)
            },
            fillContent() {
                const simplemde = this.simplemde
                const title = ls.getItem('smde_title')
                //如果有标题数据，则把他当成标题
                if (title !== null) {
                    this.title = title
                }
                //使用编辑器的内容当成文章内容
                this.content = simplemde.value()
            },
            //发布方法
            post() {
                const title = this.title
                const content = this.content
                //标题和内容都不为空
                if (title !== '' && content.trim() !== '') {
                    const article = {
                        title,
                        content
                    }
                    this.$store.dispatch('post', {article})
                    //清除数据
                    this.clearData()
                }
            },
            clearData() {
                this.title = ''
                ls.removeItem('smde_title')
                this.simplemde.value('')
                this.simplemde.clearAutosavedValue()
            }
        }
    }
</script>

<style scoped>
    .blog-container {
        max-width: 980px;
        margin: 0 auto;
        margin-top: 20px;
    }

    textarea {
        height: 200px;
    }
</style>
