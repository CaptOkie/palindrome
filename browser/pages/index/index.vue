<template>
    <md-layout md-column>
        <md-whiteframe md-elevation="2">
            <md-toolbar>
                <div class="md-flex-20"></div>
                <h1 class="md-title md-flex-60">Messages</h1>       
                <div class="md-flex-20"></div>
            </md-toolbar>
            <md-toolbar class="md-transparent">
                <div class="md-flex-20"></div>
                <md-layout md-row md-flex="60" class="flex-nowrap">
                    <input v-model="msg" @keyup.enter="create" class="msg-input" type="text" placeholder="Message">

                    <md-button @click.native="create" class="md-icon-button" style="margin-right: -8px;">
                        <md-icon>send</md-icon>
                    </md-button>
                </md-layout>
            </md-toolbar>
        </md-whiteframe>
    
        <md-layout md-row>
            <md-layout md-flex="20"></md-layout>
            <md-layout md-flex="60" md-column style="padding: 16px 8px;">
                <md-table-card>

                    <md-table>
                        <md-table-header>
                            <md-table-row>
                                <md-table-head style="width: 100%">Message</md-table-head>
                                <md-table-head style="width: 0%">Palindrome</md-table-head>
                                <md-table-head style="width: 0%">Delete</md-table-head>
                            </md-table-row>
                        </md-table-header>

                        <md-table-body>
                            <md-table-row v-for="message in messages" :key="message.value">
                                <md-table-cell>{{message.value}}</md-table-cell>
                                <md-table-cell>
                                    <md-icon>{{message.palindrome ? 'check' : 'close'}}</md-icon>
                                </md-table-cell>
                                <md-table-cell>
                                    <md-button class="md-icon-button">
                                        <md-icon>delete</md-icon>
                                    </md-button>
                                </md-table-cell>
                            </md-table-row>
                        </md-table-body>
                    </md-table>
                </md-table-card>
            </md-layout>
            <md-layout md-flex="20"></md-layout>
        </md-layout>
    </md-layout>
</template>

<script>
import 'Material/layout';
import 'Material/card';
import 'Material/table';
import 'Material/toolbar';
import 'Material/button';
import 'Material/icon';
import 'Material/inputContainer';
import 'Material/whiteframe';
import { messages } from 'Common/urls';
import axios from 'axios';

const msgsUrl = messages();
export default {
    name : 'index-page',
    data() {
        return { msg : '', messages : [] };
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
.md-table .md-table-cell .md-button .md-icon {
    margin: auto !important;
}
</style>