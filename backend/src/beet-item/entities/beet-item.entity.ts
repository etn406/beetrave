import { DataTypes } from 'sequelize';
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'items',
    timestamps: false
})
export class BeetItem extends Model {
    @Column({ type: DataTypes.BLOB })
    path?: Buffer;

    @PrimaryKey
    @Column
    id?: number;

    @Column
    album_id?: number;

    @Column
    year?: number;

    @Column
    month?: number;

    @Column
    day?: number;

    @Column
    track?: number;

    @Column
    tracktotal?: number;

    @Column
    disc?: number;

    @Column
    disctotal?: number;

    @Column
    bpm?: number;

    @Column
    comp?: number;

    @Column
    r128_track_gain?: number;

    @Column
    r128_album_gain?: number;

    @Column
    original_year?: number;

    @Column
    original_month?: number;

    @Column
    original_day?: number;

    @Column
    bitrate?: number;

    @Column
    samplerate?: number;

    @Column
    bitdepth?: number;

    @Column
    channels?: number;

    @Column
    discogs_albumid?: number;

    @Column
    discogs_artistid?: number;

    @Column
    discogs_labelid?: number;

    @Column({ type: DataTypes.FLOAT.UNSIGNED })
    rg_track_gain?: number;

    @Column({ type: DataTypes.FLOAT.UNSIGNED })
    rg_track_peak?: number;

    @Column({ type: DataTypes.FLOAT.UNSIGNED })
    rg_album_gain?: number;

    @Column({ type: DataTypes.FLOAT.UNSIGNED })
    rg_album_peak?: number;

    @Column({ type: DataTypes.FLOAT.UNSIGNED })
    length?: number;

    @Column({ type: DataTypes.FLOAT.UNSIGNED })
    mtime?: number;

    @Column({ type: DataTypes.FLOAT.UNSIGNED })
    added?: number;

    @Column
    title?: string;

    @Column
    artist?: string;

    @Column
    artist_sort?: string;

    @Column
    artist_credit?: string;

    @Column
    album?: string;

    @Column
    albumartist?: string;

    @Column
    albumartist_sort?: string;

    @Column
    albumartist_credit?: string;

    @Column
    genre?: string;

    @Column
    lyricist?: string;

    @Column
    composer?: string;

    @Column
    composer_sort?: string;

    @Column
    arranger?: string;

    @Column
    grouping?: string;

    @Column
    lyrics?: string;

    @Column
    comments?: string;

    @Column
    mb_trackid?: string;

    @Column
    mb_albumid?: string;

    @Column
    mb_artistid?: string;

    @Column
    mb_albumartistid?: string;

    @Column
    mb_releasetrackid?: string;

    @Column
    albumtype?: string;

    @Column
    label?: string;

    @Column
    acoustid_fingerprint?: string;

    @Column
    acoustid_id?: string;

    @Column
    mb_releasegroupid?: string;

    @Column
    asin?: string;

    @Column
    catalognum?: string;

    @Column
    script?: string;

    @Column
    language?: string;

    @Column
    country?: string;

    @Column
    albumstatus?: string;

    @Column
    media?: string;

    @Column
    albumdisambig?: string;

    @Column
    releasegroupdisambig?: string;

    @Column
    disctitle?: string;

    @Column
    encoder?: string;

    @Column
    initial_key?: string;

    @Column
    format?: string;

    @Column
    style?: string;

    @Column
    work?: string;

    @Column
    mb_workid?: string;

    @Column
    work_disambig?: string;

    @Column
    trackdisambig?: string;

    @Column
    albumtypes?: string;

    @Column
    isrc?: string;
}
