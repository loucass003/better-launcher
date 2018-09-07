<template>
    <v-img
        :src="skin"
        aspect-ratio="1"
        class="grey lighten-2"
    ></v-img>
</template>

<script>
import request from 'request';
import fs from 'fs';
import { SKINS } from '../utils'
import path from 'path'
import { error } from 'util';

export default {
    name: 'skin',
    props: [ 'uuid' ],
    data() {
        return {
            skin: '/static/no-skin.png'
        }
    },
    methods: {
        loadImage() {
            const target = path.join(SKINS, `${this.uuid}`)
            if (!fs.existsSync(target)) {
                this.downloadImg();
                return;
            }

            fs.readFile(target, (err, data) => {
                const b64data = new Buffer(data).toString('base64');
                this.skin = `data:image/png;base64, ${b64data}`;
            });
        },
        downloadImg() {
            const uri = `https://crafatar.com/avatars/${this.uuid}?overlay&size=512&default=MHF_Steve`;

            const req = request({
                method: 'GET',
                uri
            })

            const target = path.join(SKINS, `${this.uuid}`)
            if (!fs.existsSync(SKINS))
                fs.mkdirSync(SKINS);

            const out = fs.createWriteStream(target)
            req.pipe(out)

            req.on('end', () => {
                this.loadImage();
            });
        },
        
    },
    created() {
        this.loadImage();
    }  
}
</script>

<style lang="stylus">

</style>
