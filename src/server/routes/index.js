module.exports = [
    {
        method:     'GET',
        path:       '/{type}/{file}',

        handler:    function(request, reply) {
            reply.file('../public/' + request.params.type + '/' + request.params.file);
        }
    },

    {
        method:     'GET',
        path:       '/{type}/{lib}/{file}',

        handler:    function(request, reply) {
            var params = request.params;

            reply.file('../public/' + params.type + '/' + params.lib + '/' + params.file);
        }
    }
];