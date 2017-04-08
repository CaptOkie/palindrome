<template>
    <md-layout md-row>
        <md-layout md-flex="20"></md-layout>
        <md-layout md-flex="60" md-column>
            <md-table-card>
                <md-toolbar class="md-accent">
                    <h1 class="md-title">Messages</h1>
                    
                    <md-input-container style="flex: 2;">
                        <md-input v-model="msg" @keyup.enter.native="create" type="text" placeholder="Message">
                        </md-input>
                    </md-input-container>

                    <md-button @click.native="create" class="md-icon-button">
                        <md-icon>add</md-icon>
                    </md-button>
                </md-toolbar>

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
</template>

<script>
import 'Material/layout';
import 'Material/card';
import 'Material/table';
import 'Material/toolbar';
import 'Material/button';
import 'Material/icon';
import 'Material/inputContainer';
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
body {
    padding: 16px;
}

.md-toolbar {
    background-color: #3f51b5 !important;
    color: rgba(255, 255, 255, .87) !important;
}

.md-table .md-table-cell .md-button .md-icon {
    margin: auto !important;
}
</style>