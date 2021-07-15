/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
const uuid_1 = require("./utils/uuid");
class WorkDoneProgressImpl {
    constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
        WorkDoneProgressImpl.Instances.set(this._token, this);
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
    }
    get token() {
        return this._source.token;
    }
    begin(title, percentage, message, cancellable) {
        let param = {
            kind: 'begin',
            title,
            percentage,
            message,
            cancellable
        };
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
    }
    report(arg0, arg1) {
        let param = {
            kind: 'report'
        };
        if (typeof arg0 === 'number') {
            param.percentage = arg0;
            if (arg1 !== undefined) {
                param.message = arg1;
            }
        }
        else {
            param.message = arg0;
        }
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
    }
    done() {
        WorkDoneProgressImpl.Instances.delete(this._token);
        this._source.dispose();
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, { kind: 'end' });
    }
    cancel() {
        this._source.cancel();
    }
}
WorkDoneProgressImpl.Instances = new Map();
class NullProgress {
    constructor() {
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
    }
    get token() {
        return this._source.token;
    }
    begin() {
    }
    report() {
    }
    done() {
    }
}
function attachWorkDone(connection, params) {
    if (params === undefined || params.workDoneToken === undefined) {
        return new NullProgress();
    }
    const token = params.workDoneToken;
    delete params.workDoneToken;
    return new WorkDoneProgressImpl(connection, token);
}
exports.attachWorkDone = attachWorkDone;
exports.ProgressFeature = (Base) => {
    return class extends Base {
        initialize(capabilities) {
            var _a;
            if (((_a = capabilities === null || capabilities === void 0 ? void 0 : capabilities.window) === null || _a === void 0 ? void 0 : _a.workDoneProgress) === true) {
                this._progressSupported = true;
                this.connection.onNotification(vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type, (params) => {
                    let progress = WorkDoneProgressImpl.Instances.get(params.token);
                    if (progress !== undefined) {
                        progress.cancel();
                    }
                });
            }
        }
        attachWorkDoneProgress(token) {
            if (token === undefined) {
                return new NullProgress();
            }
            else {
                return new WorkDoneProgressImpl(this.connection, token);
            }
        }
        createWorkDoneProgress() {
            if (this._progressSupported) {
                const token = uuid_1.generateUuid();
                return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
                    const result = new WorkDoneProgressImpl(this.connection, token);
                    return result;
                });
            }
            else {
                return Promise.resolve(new NullProgress());
            }
        }
    };
};
var ResultProgress;
(function (ResultProgress) {
    ResultProgress.type = new vscode_languageserver_protocol_1.ProgressType();
})(ResultProgress || (ResultProgress = {}));
class ResultProgressImpl {
    constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
    }
    report(data) {
        this._connection.sendProgress(ResultProgress.type, this._token, data);
    }
}
function attachPartialResult(connection, params) {
    if (params === undefined || params.partialResultToken === undefined) {
        return undefined;
    }
    const token = params.partialResultToken;
    delete params.partialResultToken;
    return new ResultProgressImpl(connection, token);
}
exports.attachPartialResult = attachPartialResult;
//# sourceMappingURL=progress.js.map