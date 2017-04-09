<template>
    <md-layout md-column>
        <md-whiteframe md-elevation="4">
            <md-toolbar class="header">
                <div class="md-flex-20"></div>
                <h1 class="md-display-3 md-flex-60 title">Palindrome</h1>
            </md-toolbar>

            <md-toolbar class="md-transparent">
                <md-layout md-row md-flex-offset="20" md-flex="60" class="flex-nowrap">
                    <input v-model="msg" @keyup.enter="create" class="msg-input" type="text" placeholder="Message">

                    <md-button @click.native="create" class="md-icon-button msg-btn">
                        <md-icon>send</md-icon>
                    </md-button>
                </md-layout>
            </md-toolbar>
        </md-whiteframe>
    
        <md-layout md-row>
            <md-layout class="body" md-flex-offset="20" md-flex="60" md-column>
                <md-list>
                    <c-msg-item v-for="(message, index) in messages" :key="message.id" :p-msg="message"
                            @e-remove="remove(message, index)" @e-save="update">
                    </c-msg-item>
                </md-list>
            </md-layout>
        </md-layout>

        <md-snackbar ref="snackbar" md-position="top center" :md-duration="2500">
            <span>{{notification}}</span>
        </md-snackbar>
    </md-layout>
</template>

<script>
import 'Material/layout';
import 'Material/card';
import 'Material/toolbar';
import 'Material/button';
import 'Material/icon';
import 'Material/whiteframe';
import 'Material/list';
import 'Material/snackbar';
import cMsgItem from 'Components/msg-item';
import { messages } from 'Common/urls';
import axios from 'axios';

const msgsUrl = messages();
export default {
    name : 'index-page',
    data() {
        return { msg : '', messages : [], notification : '' };
    },
    methods : {
        create() {
            if (!this.msg.length) {
                return;
            }

            const curr = this.msg;
            axios.post(msgsUrl, { value : this.msg }).then(res => {
                if (curr === this.msg) {
                    this.msg = '';
                }
                this.messages.push(res.data);
            })
            .catch(err => {
                switch (err.response.status) {
                    case 409:
                        this.showExists();
                        break;
                    default: 
                        console.log(err.response.data);
                        break;
                }
            });
        },
        remove(msg, index) {
            if (this.removing) {
                return;
            }
            this.removing = true;

            axios.delete(messages(msg.id)).then(res => {
                this.messages.splice(index, 1);
            })
            .catch(err => {
                switch(err.response.status) {
                    case 404:
                        this.messages.splice(index, 1);
                        break;
                    default:
                        console.log(err.response.data);
                        break;
                }
            })
            .then(() => {
                this.removing = false;
            });
        },
        update(data) {
            const { value, item } = data;
            axios.post(messages(item.id), { value }).then(res => {
                item.value = res.data.value;
                item.palindrome = res.data.palindrome;
            })
            .catch(err => {
                switch (err.response.status) {
                    case 409:
                        this.showExists();
                        break;
                    default: 
                        console.log(err.response.data);
                        break;
                }
            });
        },
        showExists() {
            this.notification = 'Message already exists';
            this.$refs.snackbar.open();
        }
    },
    created() {
        axios.get(msgsUrl).then(res => {
            this.messages = res.data.items;
        });
    },
    components : {
        cMsgItem
    }
}
</script>

<style>
.body {
    padding: 16px 8px;
}

.md-toolbar.header {
    height: 200px;
    padding-top: 50px;
}
.md-toolbar.header .title {
    color: inherit;
    margin: 0;
}

.msg-input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    font: inherit;
    font-size: 18px;
    color: rgba(0,0,0,.87);
}
.md-button.md-icon-button.msg-btn {
    margin-right: -8px;
}
</style>