<template>
  <section class="container">
    <p>{{ $route.params.id }}</p>
    <v-simple-table dence>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">DONE</th>
            <th class="text-left">ITEM ID</th>
            <th class="text-left">TITLE</th>
            <th class="text-left">DETAIL</th>
            <!-- <th class="text-left">CREATED AT</th> -->
            <th class="text-left">CREATED BY</th>
            <!-- <th class="text-left">COMMENT</th> -->
            <th class="text-left">DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, key) in $store.getters['data/getData']"
            v-bind:key="key"
            v-bind:class="{ done: value.isDone }"
            @click="selectItem(key)"
          >
            <td><v-checkbox v-model="isDone" :value="key"></v-checkbox></td>
            <td>{{ key }}</td>
            <td>{{ value.title }}</td>
            <td>{{ value.detail }}</td>
            <!-- <td>{{ value.createdAt }}</td> -->
            <td>{{ value.createdBy }}</td>
            <!-- <td>{{ value.comment }}</td> -->
            <td>
              <v-icon left @click="deleteData(key)">
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>
