<template>
  <v-app id="followers">
    <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-text class="">
        <div class="display-1 pt-3">팔로우</div>
        <p class="mb-0 text--primary">{{ profile.nickName }}님을 팔로우 하는 유저입니다.</p>
      </v-card-text>
      <v-divider class="m-0"></v-divider>
      <v-virtual-scroll :itemHeight="50" height="300" :items="profile.followerList" v-if="profile.followerList">
        <template v-slot="{item}">
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar>
                <img v-if="item.profileImg" :src="`${item.profileImg}`">
                <img v-else src="http://bit.do/anonymouseuser">
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content class="text-left">
              <v-list-item-title class="nicknameSection" @click="selectUser(item.id)">{{ item.nickname }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action  >
              <div v-if="item.id !== myaccount.id">
                <v-btn 
                  small dark color="grey lighten-1" 
                  v-show="item.isFollow"
                  @click="clickedFollow(item)">팔로잉</v-btn>
                <v-btn 
                  small outlined color="grey lighten-1" 
                  v-show="!item.isFollow"
                  @click="clickedFollow(item)">팔로우</v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <v-card-text v-else class="p-0">
        <p class="py-2 m-0">{{ profile.nickName }}을 팔로우하는 유저가 없습니다.</p>
      </v-card-text>
      <v-divider class="m-0"></v-divider>
      <v-card-actions>
        <v-col class="text-right">
          <v-btn color="brown lighten-3" dark @click.stop="show=false" class="text-right"> Close</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'
export default {
  data() {
    return {
    }
  },
  props: {
     value: Boolean,
     profile: Object,
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    },
    ...mapState(['myaccount'])
  },
  methods: {
    ...mapActions(['createNoti']),
    ...mapActions('profileStore', ['clickFollowModal']),
    selectUser(userId) {
      router.push({ name: 'ProfileFeed', params: { userId: userId }})
    },
    clickedFollow(item) {
      console.log(item)
      let notiData = new Object()
      notiData = {
        to: item.id,
        dataId: 0,
        isRead: false,
        type: "follow"
      }
      this.createNoti(notiData)
      this.clickFollowModal(item.id)
      item.isFollow = !item.isFollow
    }
  },
  created() {
  }
}
</script>
<style scoped>
.nicknameSection {
  cursor: pointer;
}
</style>