<template>
    <md-list-item class="md-whiteframe-2dp msg-item">
        <md-icon>{{pMsg.palindrome ? 'check' : 'close'}}</md-icon>
        <span>{{pMsg.value}}</span>

        <md-list-expand>
            <md-layout md-column>
                <md-layout md-column class="msg-item-content">
                    <md-input-container>
                        <md-input @keyup.enter.native="save" v-model="newMsg" placeholder="Edit Message"></md-input>
                    </md-input-container>
                </md-layout>

                <md-layout md-row class="msg-item-actions">
                    <md-button @click.native="remove">Delete</md-button>
                    <md-button @click.native="save" class="md-primary">Save</md-button>
                </md-layout>
            </md-layout>
        </md-list-expand>
    </md-list-item>
</template>

<script>
import 'Material/layout';
import 'Material/button';
import 'Material/icon';
import 'Material/list';
import 'Material/inputContainer';

export default {
    name : 'c-msg-item',
    props : [ 'p-msg' ],
    data() {
        return { newMsg : '' };
    },
    methods : {
        remove() {
            this.$emit('e-remove');
        },
        save() {
            if (this.newMsg.length) {
                this.$emit('e-save', { value : this.newMsg, item : this.pMsg });
            }
        },
        clearMsg() {
            this.newMsg = '';
        }
    },
    mounted() {
        this.$el.querySelector(':scope > button').addEventListener('click', this.clearMsg);
    }
}
</script>

<style>
.msg-item {
    margin: 4px 0;
}
.msg-item:first-of-type {
    margin-top: 0;
}
.msg-item:last-of-type {
    margin-bottom: 0;
}
.msg-item.md-list-item-expand.md-active:after,
.msg-item.md-list-item-expand.md-active:before {
    display: none;
}

.msg-item-content {
    position: relative;
    padding: 0 72px;
}

.msg-item-actions {
    justify-content: flex-end;
    padding: 8px;
    position: relative;
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
</style>