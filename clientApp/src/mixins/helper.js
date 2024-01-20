import _ from 'lodash'

_.mixin({
    deep: function (obj, mapper) {
        return mapper(_.mapValues(obj, function (v) {
            return _.isPlainObject(v) ? _.deep(v, mapper) : v;
        }));
    },
});

let loginInfo = {};

try {
    loginInfo = JSON.parse(localStorage.getItem("userData"))
    // console.log(typeof loginInfo == undefined);
    // localStorage.getItem("userData")
} catch (error) {
    
}


export default {
    data: function(){
        return {
            lodash: _,
            loginInfo: loginInfo 
        }
    },
    methods: {}
}