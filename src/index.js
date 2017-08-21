import { tokenizer } from 'acorn';
import { SourceMapConsumer, SourceMapGenerator } from 'source-map';

var __fakename = "__fakename";

export function generator(src, dist, file) {
    var _file = file || __fakename,
        srcTs = tokenizer(src, {locations: true}),
        distTs = tokenizer(dist, {locations: true});

    var generator = new SourceMapGenerator({file: _file});

    while (true) {

        var srcT = srcTs.getToken(),
            distT = distTs.getToken();

        if (srcT.type.label === "eof")
            break;

        var mapping = {
            original: srcT.loc.start,
            generated: distT.loc.start,
            source: _file
        };

        if (srcT.type.label === 'name') {
            mapping.name = srcT.value;
        }
        
        generator.addMapping(mapping);
    }

    generator.setSourceContent("source", src);

    return generator.toString();
}

export function consumer(sourcemap) {
    var _string = sourcemap,
        _sources = JSON.parse(_string).sources || [__fakename];

    return {
        getGenerated: function(opts) {
            var line = opts.line,
                col = opts.column,
                _file = opts.file || _sources[0];

            return new SourceMapConsumer(_string).generatedPositionFor({
                    source: _file,
                    line: line,
                    column: col
                });
        },
        getOriginal: function(opts) {
            var line = opts.line,
                col = opts.column,
                _file = opts.file || _sources[0];

            return new SourceMapConsumer(_string).originalPositionFor({
                    line: line,
                    column: col
                });
        }
    }
}