using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DurveyServer.Helper
{
    public class MySqlHelper : IDisposable
    {
        MySqlConnection _conn;
        MySqlTransaction _trans = null;

        public MySqlHelper()
        {
            _conn = new MySqlConnection("Server=192.168.200.148;Port=3306;Database=durveydb;Uid=root;Pwd=1234;");
        }

        public void BeginTransaction()
        {
            if (_conn.State != System.Data.ConnectionState.Open)
                _conn.Open();

            _trans = _conn.BeginTransaction();
        }

        public void Commit()
        {
            _trans.Commit();
            _trans = null;
        }

        public void Rollback()
        {
            _trans.Rollback();
            _trans = null;
        }

        public List<T> Query<T>(string sql, object param)
        {
            return Dapper.SqlMapper.Query<T>(_conn, sql, param, _trans).ToList();
        }

        public T QuerySingle<T>(string sql, object param)
        {
            return Dapper.SqlMapper.QuerySingleOrDefault<T>(_conn, sql, param, _trans);
        }

        public int Execute(string sql, object param)
        {
            return Dapper.SqlMapper.Execute(_conn, sql, param, _trans);
        }

        #region Dispose 관련
        private bool disposedValue;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _conn.Dispose();

                    if(_trans != null)
                    {
                        _trans.Rollback();
                        _trans.Dispose();
                    }
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // 이 코드를 변경하지 마세요. 'Dispose(bool disposing)' 메서드에 정리 코드를 입력합니다.
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
