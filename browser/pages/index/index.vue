<template>
    <md-layout md-column>
        <md-whiteframe md-elevation="4">
            <md-toolbar style="height: 200px; padding-top: 50px;">
                <div class="md-flex-20"></div>
                <h1 class="md-display-3 md-flex-60" style="color: inherit; margin: 0;">Palindrome</h1>
            </md-toolbar>

            <md-toolbar class="md-transparent">
                <md-layout md-row md-flex-offset="20" md-flex="60" class="flex-nowrap">
                    <input v-model="msg" @keyup.enter="create" class="msg-input" type="text" placeholder="Message">

                    <md-button @click.native="create" class="md-icon-button" style="margin-right: -8px;">
                        <md-icon>send</md-icon>
                    </md-button>
                </md-layout>
            </md-toolbar>
        </md-whiteframe>
    
        <md-layout md-row>
            <md-layout md-flex-offset="20" md-flex="60" md-column style="padding: 16px 8px;">
                <md-list>
                    <md-list-item v-for="message in messages" :key="message.value" @click.native="toggle(message)"
                            class="md-whiteframe-2dp msg-item">
                        <md-icon>{{message.palindrome ? 'check' : 'close'}}</md-icon>
                        <span>{{message.value}}</span>

                        <md-button class="md-icon-button md-list-action">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-list-item>
                </md-list>
            </md-layout>
        </md-layout>
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
import { messages } from 'Common/urls';
import axios from 'axios';

const msgsUrl = messages();
export default {
    name : 'index-page',
    data() {
        return { msg : '', messages : [], selected : undefined };
    },
    methods : {
        create() {
            if (!this.msg.length) {
                return;
            }

            axios.post(msgsUrl, { msg : this.msg }).then(res => {
                this.messages.push(res.data);
            })
            .catch(err => {
                console.log((err.response && err.response.data) || err);
            });
        },
        toggle(msg) {
            this.selected = this.isSelected(msg) ? undefined : msg.value;
        },
        isSelected(msg) {
            return this.selected === msg.value;
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
.msg-input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    font: inherit;
    font-size: 18px;
    color: rgba(0,0,0,.87);
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
</style>