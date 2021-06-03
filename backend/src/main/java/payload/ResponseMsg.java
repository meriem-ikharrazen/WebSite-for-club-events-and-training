package payload;

public class ResponseMsg {
	private int status;
	private Object data;
	public ResponseMsg(int status, Object data) {
		super();
		this.status = status;
		this.data = data;
	}
	public ResponseMsg() {
		super();
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Object getdata() {
		return data;
	}
	public void setdata(Object data) {
		this.data = data;
	}
	
	

}
