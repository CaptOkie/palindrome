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
                    <md-list-item v-for="(message, index) in messages" :key="message.id"
                            class="md-whiteframe-2dp msg-item">
                        <md-icon>{{message.palindrome ? 'check' : 'close'}}</md-icon>
                        <span>{{message.value}}</span>

                        <md-list-expand>
                            <md-layout md-column>
                                <md-layout md-row class="msg-item-actions">
                                    <md-button @click.native="remove(message, index)">
                                        Delete
                                    </md-button>
                                </md-layout>
                            </md-layout>
                        </md-list-expand>
                    </md-list-item>
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
                        this.notification = 'Message already exists';
                        this.$refs.snackbar.open();
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
        }
    },
    created() {
        axios.get(msgsUrl).then(res => {
            this.messages = res.data.items;
        });
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

.msg-item {
    margin: 4px 0;
}
.msg-item:first-of-type {
    margin-top: 0;
}
.msg-item:last-of-type {
    margin-bottom: 0;
}
.msg-item-actions {
    justify-content: flex-end;
    padding: 8px;
}
.msg-item-actions:before {
    height: 1px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    transition: all .4s cubic-bezier(.25,.8,.25,1);
    content: " ";
    background-color: rgba(0,0,0,.12);
}
.msg-item-actions .md-button {
    margin: 0 0 0 8px;
}
.msg-item-actions .md-button:first-of-type {
    margin-left: 0;
}
.msg-item.md-list-item-expand.md-active:after,
.msg-item.md-list-item-expand.md-active:before {
    display: none;
}
</style>