<template>
    <div class="table-wrapper">
        <v-data-table
            :headers="tableData.headers"
            :items="tableData.data"
            hide-actions
            item-key="id"
        >
        <template v-slot:items="props">
            <tr :item-key="props.index">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.author }}</td>
                <td class="activeContent" @click="get_selection(props.index)">{{ props.item.content.split('.')[0] }}</td>
                <td class="actionIcons">
                    <span class="editRow" @click="rowClicked(props)"><i class="fa fa-pencil"></i></span>
                    <span class="deleteRow" @click="rowClicked(props, 'delete')"><i class="fa fa-trash"></i></span>
                </td>
            </tr>
        </template>
        </v-data-table>  
    </div>
</template>

<script>

export default {
    name: "tablecomp",
    props: {
        tableData: [Object, Array]
    },
    methods: {
        rowClicked(rowData, action) {
           this.$emit('onRowClicked', rowData, action)
        },
        get_selection(rowIndex) {
            var inputText = document.getElementsByClassName("activeContent");
            this.$emit('getSelectedWord', rowIndex, inputText)
        }
    }
}
</script>
